class Api::UsersController < ApplicationController

  def create
    user =
    User.create!(user_params)
    user.update!(health: 3, score: 0, is_dead: 0, room_id: 0)
    user.save!
    if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
    end
  end

  def score
    user = User.find_by(id: session[:user_id])
    user.update!(
      room_id: params[:room_id],
      is_dead: true,
      score: params[:score],
      minutes_in_game: params[:minutes_in_game],
      seconds_in_game: params[:seconds_in_game],
    )
    user.save!
    render json: user
  end

  def index
    all_users = User.pluck(:name)
    render json: all_users
  end

  def leaderboard
    all_user_stats = User.pluck(:name, :score)
    render json: all_user_stats
  end

  private

    def user_params
    params.permit(
      :name,
      :email
    )
  end
end
