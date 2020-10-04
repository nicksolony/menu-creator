class MenusController < ApplicationController
  before_action :set_menu, only: [:show, :update, :destroy]


  def index
    @menus = Menu.all.order(:name)
    render json: @menus, include: :menu_items
  end

  def show
    render json: @menu, include: :menu_items
  end

  def create
    if @menu = Menu.create(menu_params)
      render json: @menu, status: :created, location: @menu
    else
      render json: @menu.errors.full_messages, status: :unprocessable_entity
    end
  end

    # PATCH/PUT /items/1
  def update
   if @menu.update(menu_params)
     render json: @menu
   else
     render json: @menu.errors.full_messages, status: :unprocessable_entity
   end
  end

    # DELETE /items/1
  def destroy
   @menu.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu
      @menu = Menu.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def menu_params
      params.require(:menu).permit(:name,menu_items_attributes:[:item_id])
      # params.require(:menu).permit(:name,:menu_items)
    end

end
