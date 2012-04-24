require 'sinatra'
require 'redis'

redis = Redis.new

get '/' do
  File.read('login.html')
end

get '/:team_name' do
  File.read('index.html')
end

get '/public/*' do |path|
  redirect('/' + path)
end

post '/*/points' do |team_name|
  redis.set(team_name + '_db', params['data'])
  return 'success'
end

get '/*/points' do |team_name|
  return redis.get(team_name + '_db')
end

post '/signup' do
  team_name = params['team_name']
  password = params['password']

  if redis.get(team_name).nil?
    redis.set(team_name, password).eql?('OK') ?
        'succeed' : 'Signup failed, please try again'
  else
    'The team already exits, please choose another team name.'
  end
end

post '/login' do
  team_name = params['team_name']
  password = params['password']
  except_password = redis.get(team_name)

  if except_password.nil?
    'The team is not exits, please signup first.'
  else
    except_password.eql?(password) ? 'succeed' : 'The password is error, please try again.'
  end
end