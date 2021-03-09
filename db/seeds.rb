puts("Destroy previous instances...")
Like.destroy_all
Comment.destroy_all
Follow.destroy_all
Post.destroy_all
User.destroy_all

puts("Done")

puts("Create Users...")
User.create(username: "Bear Grylls", email:"beargrylls@official.com", password:"helloworld")
User.create(username: "Beyonce", email:"beyonce@official.com", password:"helloworld")
User.create(username: "Ellon Musk", email:"ellonmusk@official.com", password:"helloworld")
puts("Done")

puts("Create Posts...")
p = Post.new(user_id: User.first.id, video_url: "https://res.cloudinary.com/dg4hemebf/video/upload/v1615240176/oss-117-jaime-me-beurrer-la-biscotte_x0jutd.mp4", caption: "Rick Rolled")
p.save!
puts("Done")

puts("Create Likes...")
l = Like.create(user_id: User.first.id, post_id: Post.first.id, is_liked: true)
l.save!
puts("Done")

puts("Create Comments...")
c = Comment.create(user_id: User.first.id, post_id: Post.first.id, text: "Lol you got me")
c.save!
puts("Done")

puts("Create Follows...")
f = Follow.create(follower_id: User.first.id, followed_user_id: User.second.id)
f.save!
puts("Done")