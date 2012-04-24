require 'sinatra'
require 'redis'

enable :sessions

redis = Redis.new

get '/' do
  File.read('login.html')
end

get '/:team_name' do |team_name|
  session[:user_info] == team_name ?
    File.read('index.html') :
    redirect('/')
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
    if redis.set(team_name, password).eql?('OK')
      session[:user_info] = team_name
      'succeed'
    else
      'Signup failed, please try again'
    end
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
    if except_password.eql?(password)
      session[:user_info] = team_name
     'succeed'
    else
     'The password is error, please try again.'
    end
  end
end