class PostsController < ApplicationController
    def index
        @posts = Post.all
    end

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.user = current_user

        if @post.save
            redirect_to posts_path
        else
            flash[:alert] = "Something went wrong."
            render :new
        end
    end

    private

    def post_params
        params.require(:post).permit(:video, :caption)
      end

end
