Rails.application.routes.draw do
  namespace :api do
    post'/newuser', to: 'users#create'
    post '/addscore', to: 'users#score'
    get '/allusers', to: 'users#index'
    get '/leaderboard', to: 'users#leaderboard'
    get '/room', to: 'rooms#find_room'
    get '/item', to: 'rooms#find_item'
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
