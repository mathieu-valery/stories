class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_one_attached :video

  validates :caption, presence: true
  validates :video, attached: true, content_type: [:mov, :mp4, :mkv] #added thanks to active_storage_validations gem
  

  def video_key
    self.video.key
  end

end
