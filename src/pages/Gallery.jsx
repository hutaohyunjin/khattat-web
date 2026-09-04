import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, Trash2, Images } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { useToast } from '@/components/ui/use-toast';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const { toast } = useToast();

  const load = async () => {
    const all = await base44.entities.GalleryItem.list('-created_date', 200);
    setItems(all);
    setLoading(false);
  };

  useEffect(() => { load().catch(() => setLoading(false)); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.GalleryItem.create({
        image_url: file_url,
        title: file.name.replace(/\.[^.]+$/, '') || 'Uploaded',
        source: 'upload',
      });
      toast({ title: 'Added to Gallery' });
      await load();
    } catch (err) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = async (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    await base44.entities.GalleryItem.delete(id);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <NavBar />
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="pt-20 pb-10 border-b border-rule" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-10%', right: '-8%', width: '55%', height: '130%',
            backgroundImage: 'url(https://media.base44.com/images/public/6a41bd2ca6771bd95aa5d5f2/ec49070dc_3.png)',
            backgroundSize: 'cover', backgroundPosition: 'left center',
            mixBlendMode: 'soft-light', opacity: 0.55, pointerEvents: 'none',
          }} />
          <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>Practice Archive</p>
          <h1 className="display-xl">
            YOUR<br />
            <span style={{ color: 'var(--ink-mid)' }}>GALLERY</span>
          </h1>
          <p className="mt-4 max-w-md" style={{ fontFamily: 'Barlow', fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.7, position: 'relative' }}>
            A living record of your practice. Save canvases from your lessons or upload your own work, and watch your hand improve over time.
          </p>
          <div className="mt-6 flex items-center gap-3" style={{ position: 'relative' }}>
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="btn-system">
              <Upload className="w-3.5 h-3.5" /> {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </div>
        </div>

        {/* Grid */}
        <div className="py-8 mb-8">
          {loading ? (
            <p style={{ fontFamily: 'Space Mono', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-faint)' }}>LOADING...</p>
          ) : items.length === 0 ? (
            <div className="sys-window">
              <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Empty Archive</span></div>
              <div className="p-12 text-center">
                <Images className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--ink-faint)' }} />
                <p style={{ fontFamily: 'Barlow', fontSize: 14, color: 'var(--ink-mid)' }}>No saved practice yet.</p>
                <p className="mt-1" style={{ fontFamily: 'Barlow', fontSize: 13, color: 'var(--ink-faint)' }}>
                  Save canvases from lessons or upload an image to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(item => (
                <div key={item.id} className="sys-window overflow-hidden group">
                  <div className="relative" style={{ aspectRatio: '4/3', background: 'var(--paper-dark)' }}>
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)' }}
                    >
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-7 h-7 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.6)' }}
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" style={{ color: '#fff' }} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 border-t" style={{ borderColor: 'var(--rule)' }}>
                    <p style={{ fontFamily: 'Barlow', fontWeight: 600, fontSize: 13, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.08em' }}>
                        {new Date(item.created_date).toLocaleDateString()}
                      </span>
                      <span style={{
                        fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: item.source === 'practice' ? 'var(--zzz-yellow-dim)' : 'var(--ink-faint)',
                      }}>
                        {item.source}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}