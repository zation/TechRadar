require 'sinatra'

get '/' do
  File.read('index.html')
end

get '/*.html' do |file_name|
  File.read("#{file_name}.html")
end

get '/public/*' do |path|
  redirect '/' + path
end

post '/points' do
  File.open('public/js/db.js', 'w') do |file|
    file.puts params['data']
  end
  return 'success'
end