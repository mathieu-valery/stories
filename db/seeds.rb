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
        email: "anthonyyou@gmail.com",
        password: '123456',
        username: "Anthony",
        },
        "https://res.cloudinary.com/wagon/image/upload/c_fill,g_face,h_200,w_200/v1597872878/ykktauyyzddh4mkkrzd2.jpg"
    ],
    [
        {
        email: "raphaeltoubiana@gmail.com",
        password: '123456',
        username: "Raphael",
        },
        "https://res.cloudinary.com/wagon/image/upload/c_fill,g_face,h_200,w_200/v1598027117/lg7kzhcjqieldye3ffmg.jpg"
    ],
    [
        {
        email: "oceaneleroy@gmail.com",
        password: '123456',
        username: "Oceane",
        },
        "https://res.cloudinary.com/wagon/image/upload/c_fill,g_face,h_200,w_200/v1597859853/hlm3ivjlz0tezolmvyvo.jpg"
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