Rails.application.routes.draw do
  devise_for :users

  resources :posts
  
  root to: 'posts#index'

  get '/posts', to: 'posts#index'
  
  #API
  namespace :api, defaults: {format: :json } do
    namespace :v1 do
      resources :posts, only: [:index, :create]
      resources :comments, only: [:index, :create]
      post 'comments/(:id)', to: 'comments#create'
      # resources :likes, only: [:index, :update]
    end
  end
  
end
