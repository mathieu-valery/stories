class Api::V1::CommentsController < ActionController::Base
    skip_before_action :verify_authenticity_token
    def index
        comments = Comment.all
        
        render json: comments
    end

    def create
        
        post = Post.find(params[:id])
        comment = Comment.create(text: params[:body], post_id: post.id, user_id: current_user.id)
        
        posts = Post.all
        
        render json: posts, each_serializer: PostSerializer
    end

    



end
