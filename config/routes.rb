Rails.application.routes.draw do
  devise_for :users

  resources :posts
  root to: 'posts#index'

  get '/posts', to: 'pages#home'
  
  #API
  namespace :api, defaults: {format: :json } do
    namespace :v1 do
      resources :posts, only: [:index, :create]
    end
  end
  
end
