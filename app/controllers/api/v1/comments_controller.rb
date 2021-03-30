class Api::V1::CommentsController < ActionController::Base
    skip_before_action :verify_authenticity_token
    def index
        render json: Comment.all
    end

    def create
        post = Post.find(params[:id])
        comment = Comment.new(text: params[:body], post_id: post.id, user_id: current_user.id) #mettre des strong params ??
        comment.save!
        
        ActionCable.server.broadcast("comments_channel", comment: CommentSerializer.new(comment).as_json)
        head :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment
    end

end
