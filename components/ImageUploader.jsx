'use client'

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fileToBase64, isImageFile } from '@/lib/imageUtils';

export function ImageUploader({ onImageSelect, initialImage = '', className }) {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isImageFile(file)) {
      alert('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    try {
      setIsUploading(true);
      const base64 = await fileToBase64(file);
      setImageUrl(base64);
      onImageSelect?.(base64);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    onImageSelect?.(imageUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="image-upload">Upload Image</Label>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={triggerFileInput}
            disabled={isUploading}
            className="flex-1"
          >
            {isUploading ? 'Uploading...' : 'Choose File'}
          </Button>
          <input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-url">Image URL</Label>
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <Input
            id="image-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isUploading}
            className="flex-1"
          />
          <Button type="submit" disabled={isUploading}>
            Use URL
          </Button>
        </form>
      </div>

      {imageUrl && (
        <div className="mt-4 flex justify-center">
          <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-muted">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = '';
                setImageUrl('');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
