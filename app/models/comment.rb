class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  # def as_json(options = {})
  #   #Overwrite to_json method and do as below (its needed to have right JSON pushed to api)
  
  #     {
  #       id: id,
  #       text: text,
  #       post: self.post,
  #       user: self.user,
  #       created_at: created_at
  #     }
  # end
end
