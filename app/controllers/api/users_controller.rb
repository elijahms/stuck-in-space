class Api::UsersController < ApplicationController
skip_before_action :authorize, only: :create, :score, :index, :leaderboard

  def create
    new_user =
      User.create(
        name: params[:username],
        health: 3,
        score: 0,
        is_dead: 0,
        room_id: 0,
        email: params[:email],
      )
    render json: new_user
  end

  def score
    user_details = User.find(params[:id])
    user_details.update(
      room_id: params[:room_id],
      is_dead: true,
      score: params[:score],
      minutes_in_game: params[:minutes_in_game],
      seconds_in_game: params[:seconds_in_game],
    )
    render json: user_details
  end

  def index
    all_users = User.pluck(:name)
    render json: all_users
  end

  def leaderboard
    all_user_stats = User.pluck(:name, :score)
    render json: all_user_stats
  end

end
