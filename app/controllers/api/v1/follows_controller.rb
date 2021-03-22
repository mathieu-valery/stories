class Api::V1::FollowsController < ActionController::Base
    skip_before_action :verify_authenticity_token
    def index
        follows = Follow.all

        render json: follows
    end

    def follow_user
        
    end

end
