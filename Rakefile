
namespace :server do
  task :start do
    system('ruby', 'controller.rb')
  end

  task :test do
    system('shotgun', 'controller.rb')
  end
end

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
