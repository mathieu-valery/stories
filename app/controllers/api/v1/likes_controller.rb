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
            puts ('saved')
        else
            like.is_liked ? like.update(is_liked: false) : like.update(is_liked: true)
        end

        # response to post request when user like a post. it needs this special syntax to serialize multiple objects
        render json: { 
            user: UserSerializer.new(current_user).as_json,
            like: LikeSerializer.new(like).as_json,
        }
        
    end
end
