Rails.application.routes.draw do
  root 'mainpage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
      namespace :v1 do
        get 'users/index'
        get 'user/:id', to: 'users#show'
        post 'users/create'
        delete 'users/:id', to: 'users#destroy'

        post 'login', to: 'users#login'
      end
  end
  get '*pages', to: 'mainpage#index'
end
