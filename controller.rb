require 'sinatra'
require 'redis'

redis = Redis.new

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
  redis.set 'db', params['data']
  return 'success'
end

get '/points' do
	return redis.get 'db'
end