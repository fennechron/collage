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
  onClose
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(1842);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="pro-mockup-backdrop" onClick={onClose}>
      <div className="pro-mockup-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Window Header */}
        <div className="mockup-window-bar">
          <div className="window-title">
            <span className="live-indicator" />
            <span>Instagram Feed Simulation</span>
          </div>
          <button
            type="button"
            className="window-close-btn"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Realistic iPhone Instagram Post Frame */}
        <div className="iphone-instagram-post">
          {/* Post Header */}
          <div className="native-post-header">
            <div className="native-user-block">
              {/* Instagram Story Gradient Ring */}
              <div className="native-story-ring">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="user avatar"
                  className="native-avatar"
                />
              </div>

              <div className="native-user-info">
                <div className="native-username-line">
                  <span className="native-username">studio.archive</span>
                  <div className="native-verified">
                    <Check size={8} strokeWidth={4} color="#ffffff" />
                  </div>
                  <span className="native-dot">•</span>
                  <span className="native-follow-btn">Follow</span>
                </div>
                <div className="native-audio-line">
                  <Music2 size={10} />
                  <span>JVKE • Golden Hour (Original Audio)</span>
                </div>
              </div>
            </div>

            <button type="button" className="native-more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Collage Media Container */}
          <div className="native-media-container">
            {children}
          </div>

          {/* Action Icons */}
          <div className="native-actions-row">
            <div className="native-actions-left">
              <button
                type="button"
                className={`native-action-btn ${isLiked ? 'liked' : ''}`}
                onClick={toggleLike}
              >
                <Heart size={24} fill={isLiked ? '#ff3040' : 'none'} color={isLiked ? '#ff3040' : '#ffffff'} strokeWidth={2} />
              </button>
              <button type="button" className="native-action-btn">
                <MessageCircle size={24} color="#ffffff" strokeWidth={2} />
              </button>
              <button type="button" className="native-action-btn">
                <Send size={24} color="#ffffff" strokeWidth={2} />
              </button>
            </div>

            <button
              type="button"
              className={`native-action-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark size={24} fill={isSaved ? '#ffffff' : 'none'} color="#ffffff" strokeWidth={2} />
            </button>
          </div>

          {/* Likes & Caption Text */}
          <div className="native-caption-block">
            <div className="native-likes-count">
              Liked by <strong>amalfi.vibes</strong> and <strong>{likesCount.toLocaleString()} others</strong>
            </div>

            <div className="native-caption-body">
              <strong>studio.archive</strong> Golden hour vignettes from our coastal journey. Built with CollageLab Studio.
              <span className="native-tags"> #aesthetic #editorial #photodump #collage</span>
            </div>

            <div className="native-comments-prompt">View all 24 comments</div>
            <div className="native-timestamp">2 HOURS AGO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
