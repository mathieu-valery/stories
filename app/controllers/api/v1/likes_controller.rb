class Api::V1::LikesController < ActionController::Base
    def index
        likes = Like.all

        render json: likes
    end
end
