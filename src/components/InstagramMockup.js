import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Music2,
  Check,
  X
} from 'lucide-react';

export default function InstagramMockup({
  children,
  onClose,
  aspectRatio
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(1428);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="mockup-overlay-container">
      <div className="mockup-modal-window">
        {/* Mockup Header Toolbar */}
        <div className="mockup-modal-bar">
          <div className="mockup-title">
            <span className="dot-live" />
            <span>Instagram Feed Post Preview</span>
          </div>
          <button
            type="button"
            className="mockup-close-btn"
            onClick={onClose}
            title="Exit Mockup Mode"
          >
            <X size={18} />
          </button>
        </div>

        {/* Realistic Instagram Phone / Post Card */}
        <div className="instagram-card-mockup">
          {/* Post Header */}
          <div className="ig-post-header">
            <div className="ig-user-info">
              {/* Profile Avatar with Story Ring */}
              <div className="ig-story-ring">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="profile"
                  className="ig-avatar-img"
                />
              </div>

              <div className="ig-user-names">
                <div className="ig-username-row">
                  <span className="ig-username">creator.studio</span>
                  <div className="ig-verified-pill">
                    <Check size={9} strokeWidth={4} color="#ffffff" />
                  </div>
                  <span className="ig-dot">•</span>
                  <span className="ig-follow">Follow</span>
                </div>
                <div className="ig-audio-row">
                  <Music2 size={10} />
                  <span>JVKE • Golden Hour (Aesthetic Mix)</span>
                </div>
              </div>
            </div>

            <button type="button" className="ig-more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Collage Media Container */}
          <div className="ig-post-media-wrap">
            {children}
          </div>

          {/* Post Action Icons */}
          <div className="ig-post-actions">
            <div className="ig-actions-left">
              <button
                type="button"
                className={`ig-action-icon ${isLiked ? 'liked' : ''}`}
                onClick={toggleLike}
              >
                <Heart size={24} fill={isLiked ? '#ff3040' : 'none'} color={isLiked ? '#ff3040' : '#ffffff'} />
              </button>
              <button type="button" className="ig-action-icon">
                <MessageCircle size={24} color="#ffffff" />
              </button>
              <button type="button" className="ig-action-icon">
                <Send size={24} color="#ffffff" />
              </button>
            </div>

            <button
              type="button"
              className={`ig-action-icon ${isSaved ? 'saved' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark size={24} fill={isSaved ? '#ffffff' : 'none'} color="#ffffff" />
            </button>
          </div>

          {/* Likes & Caption Text */}
          <div className="ig-post-details">
            <div className="ig-likes-text">
              Liked by <strong>amalfi.vibes</strong> and <strong>{likesCount.toLocaleString()} others</strong>
            </div>

            <div className="ig-caption-text">
              <strong>creator.studio</strong> Sunday photo dump ✨ made with InstaCollage Pro. Capturing little golden hour moments that never fade 📸☕
              <span className="ig-hashtags"> #aesthetic #photodump #filmphotography #collage #moodboard</span>
            </div>

            <div className="ig-comments-prompt">View all 42 comments</div>
            <div className="ig-time-stamp">2 HOURS AGO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
