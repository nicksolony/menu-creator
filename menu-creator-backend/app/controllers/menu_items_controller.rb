class MenuItemsController < ApplicationController
  before_action :set_menu_item, only: [:update, :destroy]

  def create
    @menu_item = MenuItem.new(menu_item_params)

    if @menu_item.save
      render json: @menu_item, status: :created, location: @menu_item
    else
      render json: @menu_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
   if @menu_item.update(menu_item_params)
     render json: @menu_item
   else
     render json: @menu_item.errors.full_messages, status: :unprocessable_entity
   end
  end

    # DELETE /items/1
  def destroy
   @menu_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu_item
     @menu_item = MenuItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def menu_item_params
      params.require(:menu_item).permit(:menu_id,:item_id)
    end
end
