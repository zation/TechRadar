require 'sinatra'
require 'redis'

redis = Redis.new

get '/:team_name' do
  File.read('index.html')
end

get '/public/*' do |path|
  redirect '/' + path
end

post '/*/points' do |team_name|
  redis.set team_name, params['data']
  return 'success'
end

get '/*/points' do |team_name|
	return redis.get team_name
end