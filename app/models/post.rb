class Post < ApplicationRecord
  belongs_to :user
  has_many :likes
  has_many :comments
  has_one_attached :video

  def video_path
    ActiveStorage::Blob.service.path_for(video.key)
  end

  # def as_json(options = {})
  #   #Overwrite to_json method and do as below (its needed to have right JSON pushed to api)
  
  #     {
  #       id: id,
  #       user_id: user_id,
  #       caption: caption,
  #       created_at: created_at,
  #       video: video
  #     }
  #   end
end
