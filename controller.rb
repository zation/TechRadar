require 'sinatra'

get '/' do
  redirect '/index.html'
end

post '/points' do
  File.open('public/js/db.js', 'w') do |file|
    file.puts params['data']
  end
  return 'success'
end