class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, :dependent => :destroy
  has_many :liking_users, :through => :likes, :source => :user
  has_many :comments, :dependent => :destroy
  has_one_attached :video

  validates :caption, presence: true
  validates :video, attached: true, content_type: [:mov, :mp4, :mkv], size: { less_than: 100.megabytes , message: 'video must be less than 100MB' } #added thanks to active_storage_validations gem
  

  def video_key
    self.video.key
  end

end
