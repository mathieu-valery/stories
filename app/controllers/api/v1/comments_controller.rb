class Api::V1::CommentsController < ActionController::Base
    def index
        comments = Comment.all
        
        render json: comments
    end

    # def create
    #     @comment = Post.new(post_params)
    #     @post.user = current_user

    #     if @post.save
    #         redirect_to posts_path
    #     else
    #         flash[:alert] = "Something went wrong."
    #         render :new
    #     end
    # end

    # private

    # def post_params
    #     params.require(:post).permit(:video, :caption)
    # end

end
