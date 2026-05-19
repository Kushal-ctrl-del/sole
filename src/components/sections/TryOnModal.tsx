import { useState, useRef, useCallback } from 'react';
import { X, Upload, Camera, Loader2, Sparkles, Star } from 'lucide-react';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoeName: string;
  shoeColor: string;
}

export default function TryOnModal({ isOpen, onClose, shoeName, shoeColor }: TryOnModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [fitScore, setFitScore] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setMimeType(file.type || 'image/jpeg');
      setFeedback('');
      setFitScore(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const base64 = image.split(',')[1];
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/ai-tryon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType,
          shoeName,
          shoeColor,
        }),
      });

      const data = await res.json();
      const raw: string = data.feedback || '';
      const scoreMatch = raw.match(/FitScore:\s*(\d+)\s*\/\s*10/i);
      if (scoreMatch) setFitScore(parseInt(scoreMatch[1]));
      setFeedback(raw.replace(/FitScore:\s*\d+\s*\/\s*10\s*\|?\s*/i, '').trim());
    } catch {
      setFeedback('Unable to analyze image. Please try again with a clearer photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImage(null);
    setFeedback('');
    setFitScore(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />
      <div className="relative bg-sole-surface border border-sole-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sole-border">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-sole-amber" />
            <h2 className="font-display text-xl text-sole-white tracking-wider">AI Try-On</h2>
          </div>
          <button onClick={handleClose} className="p-2 text-sole-muted hover:text-sole-white transition-colors rounded-lg hover:bg-sole-hover">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Shoe info */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-sole-hover rounded-xl border border-sole-border">
            <Sparkles size={14} className="text-sole-amber" />
            <p className="font-body text-sm text-sole-muted">
              Trying on: <span className="text-sole-white font-medium">{shoeName}</span>
              {shoeColor && <span className="text-sole-amber"> · {shoeColor}</span>}
            </p>
          </div>

          {/* Upload Area */}
          {!image ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-sole-border hover:border-sole-amber/50 rounded-xl p-10 text-center cursor-pointer transition-all duration-200 hover:bg-sole-hover/30"
            >
              <Upload size={32} className="text-sole-muted mx-auto mb-3" />
              <p className="font-body text-sm text-sole-white font-medium mb-1">Upload a photo</p>
              <p className="font-body text-xs text-sole-muted">Drag & drop or click to browse</p>
              <p className="font-body text-xs text-sole-muted mt-1">Photo of your feet or outfit works best</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative rounded-xl overflow-hidden bg-sole-hover border border-sole-border">
                <img src={image} alt="Upload preview" className="w-full max-h-56 object-cover" />
                <button
                  onClick={() => { setImage(null); setFeedback(''); setFitScore(null); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-sole-black/80 rounded-full flex items-center justify-center text-sole-muted hover:text-sole-white transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className="p-4 bg-sole-amber/10 border border-sole-amber/20 rounded-xl">
                  {fitScore !== null && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <Star key={i} size={12} className={i < fitScore ? 'text-sole-amber fill-sole-amber' : 'text-sole-border'} />
                        ))}
                      </div>
                      <span className="font-display text-lg text-sole-amber tracking-wider">{fitScore}/10</span>
                    </div>
                  )}
                  <p className="font-body text-sm text-sole-white/90 leading-relaxed">{feedback}</p>
                </div>
              )}

              {!feedback && !loading && (
                <button
                  onClick={handleAnalyze}
                  className="w-full py-3.5 bg-sole-amber text-sole-black font-body font-bold text-sm rounded-xl hover:bg-sole-amber/90 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_4px_16px_rgba(245,166,35,0.4)]"
                >
                  <Sparkles size={15} />
                  Analyze Fit with AI
                </button>
              )}

              {loading && (
                <div className="flex items-center justify-center gap-3 py-4">
                  <Loader2 size={18} className="animate-spin text-sole-amber" />
                  <span className="font-body text-sm text-sole-muted">Gemini AI is analyzing your style...</span>
                </div>
              )}

              {feedback && (
                <button
                  onClick={() => { setImage(null); setFeedback(''); setFitScore(null); }}
                  className="w-full py-3 border border-sole-border text-sole-muted font-body text-sm rounded-xl hover:text-sole-white hover:border-sole-border transition-colors"
                >
                  Try another photo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
