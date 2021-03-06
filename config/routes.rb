Rails.application.routes.draw do
  namespace :api do
    post '/newuser', to: 'users#create'
    patch '/addscore', to: 'users#score'
    get '/allusers', to: 'users#index'
    get '/leaderboard', to: 'users#leaderboard'
    get '/room/:id', to: 'rooms#find_room'
    get '/item/:id', to: 'rooms#find_item'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
