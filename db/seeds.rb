puts("Destroy previous instances...")
Like.destroy_all
Comment.destroy_all
Follow.destroy_all
Post.destroy_all
User.destroy_all

puts("Done")

puts("Create Users...")
users = [
    [
        {
        email: "johnfake@gmail.com",
        password: '123456',
        username: "John",
        },
        "https://res.cloudinary.com/dg4hemebf/image/upload/v1681136285/john_fake_r9i2vd.jpg"
    ],
    [
        {
        email: "williamfake@gmail.com",
        password: '123456',
        username: "William",
        },
        "https://res.cloudinary.com/dg4hemebf/image/upload/v1681136261/will_fake_l2afod.jpg"
    ],
    [
        {
        email: "anniefake@gmail.com",
        password: '123456',
        username: "Annie",
        },
        "https://res.cloudinary.com/dg4hemebf/image/upload/v1681136293/annie_fake_vvrk2a.jpg"
    ]
]

users.each do |user| iterated_user = User.new(user.first)
    file = URI.open(user.last)
    iterated_user.photo.attach(io: file, filename: 'nes.png', content_type: 'image/png')
    iterated_user.save!
  end

puts("Done")

puts("Create Posts...")

posts = [
    [
        {
        user_id: User.first.id,
        caption: "Art factory exhibition"
        },
        "https://res.cloudinary.com/dg4hemebf/video/upload/v1616429095/VID_20210309_155319_igwsoh.mp4"
    ],
    [
        {
        user_id: User.first.id,
        caption: "lovely street in Paris"
        },
        "https://res.cloudinary.com/dg4hemebf/video/upload/v1616429109/VID_20210309_161107_qvlk6q.mp4"
    ],
    [
        {
        user_id: User.first.id,
        caption: "I love les buttes chaumonts"
        },
        "https://res.cloudinary.com/dg4hemebf/video/upload/v1616429133/VID_20210309_170946_leiy6y.mp4"
    ]
]

posts.each do |post| iterated_post = Post.new(post.first)
    file = URI.open(post.last)
    iterated_post.video.attach(io: file, filename: 'nes.mp4', content_type: 'video/mp4')
    iterated_post.save!
  end
puts("Done")

puts("Create Likes...")
l = Like.create(user_id: User.second.id, post_id: Post.first.id, is_liked: true)
l.save!
puts("Done")

puts("Create Comments...")
c = Comment.create(user_id: User.second.id, post_id: Post.first.id, text: "Nice !")
c.save!
puts("Done")

puts("Create Follows...")
f = Follow.create(follower_id: User.first.id, followed_user_id: User.second.id, is_followed: true)
f.save!
puts("Done")