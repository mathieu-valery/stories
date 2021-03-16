Rails.application.routes.draw do
  devise_for :users

  resources :posts
  
  root to: 'posts#index'

  get '/posts', to: 'posts#index'

  mount ActionCable.server => '/cable'
  
  #API
  namespace :api, defaults: {format: :json } do
    namespace :v1 do
      resources :posts, only: [:index]
      resources :comments, only: [:index, :show]
      post 'comments/(:id)', to: 'comments#create'
      resources :likes, only: [:index]
      post 'likes/(:id)', to: 'likes#like_post'
    end
  end
  
end
