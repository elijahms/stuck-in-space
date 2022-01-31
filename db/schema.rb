# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_31_142833) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "inventories", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "item_id"
    t.boolean "has"
  end

  create_table "item_locations", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "item_id"
    t.integer "room_id"
    t.boolean "is_in"
  end

  create_table "items", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.boolean "is_takeable"
    t.string "description"
    t.string "inspect_choice_1"
    t.string "inspect_choice_2"
    t.boolean "is_talkable"
    t.string "talk_response"
    t.string "talk_choice_1"
    t.string "talk_choice_2"
    t.boolean "is_attackable"
    t.string "attack_response"
    t.float "durability"
    t.integer "catalyst_item"
    t.string "catalyst_response"
    t.boolean "exit_trigger"
    t.string "triggers_on"
    t.string "death_trigger"
    t.boolean "has_been_taken"
    t.boolean "has_been_attacked"
    t.boolean "has_been_talked"
  end

  create_table "rooms", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "description"
    t.integer "death_threshold"
    t.string "death_threshold_met"
    t.string "intro_description"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "health"
    t.integer "score"
    t.boolean "is_dead"
    t.integer "room_id"
    t.string "email"
    t.integer "minutes_in_game"
    t.integer "seconds_in_game"
  end

end
