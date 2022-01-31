class Api::RoomsController < ApplicationController

  def find_room
    room = Room.find(params[:id])
    render json: room
  end

  def find_item
    items = Room.find(params[:id]).items
    render json: items
  end
end
