require "./lib/init" 

disable :logging
set :root, File.dirname(__FILE__) + "/../"

get "/" do
  send_file "public/index.html"
end

get "/blank" do
  send_file "public/index.html"
end

get "/chat-events" do
  content_type "application/json"
  send_file "public/chat-events.json"
end

get "/favicon.ico" do
  ""
end

