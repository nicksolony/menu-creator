class MenusController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]


  def index
    @menus = Menu.all
    render json: @menus, include: :menu_items
  end

  def show
    render json: @menu, include: :menu_items
  end

  def create
    # @menu = Menu.new(menu_params[:name])
    debugger
    @menu = Menu.new(menu_params)

    menuitems = menu_params[:menu_items]
    menuitems.each {|item| @menu.menu_items.create(item)}
    if @menu.save
      render json: @menu, status: :created, location: @menu
    else
      render json: @menu.errors.full_messages, status: :unprocessable_entity
    end
  end
  #
  # # PATCH/PUT /items/1
  # def update
  #   if @item.update(item_params)
  #     render json: @item
  #   else
  #     render json: @item.errors.full_messages, status: :unprocessable_entity
  #   end
  # end
  #
  # # DELETE /items/1
  # def destroy
  #   @item.destroy
  # end
  #
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
