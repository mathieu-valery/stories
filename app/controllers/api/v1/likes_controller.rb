class Api::V1::LikesController < ActionController::Base
    skip_before_action :verify_authenticity_token
    def index
        likes = Like.all
        
        render json: likes
    end

    def like_post
        post = Post.find(params[:id])
        new_like = Like.new(user: current_user, post: post)
        like = Like.find_by(post_id: params[:id], user: current_user)
        
        if new_like.save

            ActionCable.server.broadcast("likes_channel", like: LikeSerializer.new(new_like).as_json)
            head :ok

        else
            like.is_liked ? like.update(is_liked: false) : like.update(is_liked: true)
            ActionCable.server.broadcast("likes_channel", like: LikeSerializer.new(like).as_json)
            head :ok

        end
        
    end
end
