class Api::V1::UsersController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def index
        users = User.all

        render json: users
    end

    def user_logged
        if user_signed_in?
            render json: current_user
        else
            render json: {}, status: 404
        end

    end
end
