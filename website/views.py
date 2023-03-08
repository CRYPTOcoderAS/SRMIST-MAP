from flask import Blueprint, render_template
from flask_login import login_required, current_user
from flask import Flask, render_template, url_for, request, session, redirect
import pymongo
from .models import Comment,User
from . import db as db_sql
try:
    conn = pymongo.MongoClient('mongodb+srv://aditya:12345@cluster0.rutst.mongodb.net/test')
    print("Connected successfully!!!")
except:
    print("Could not connect to MongoDB")

db = conn.SRMAP
collection=db['LANDMARKS']

cursor = collection.find()
landmark=[]
for i in cursor:
    name=list(i.keys())[1]
    landmark.append(name)

views = Blueprint("views", __name__)


@views.route('/')
def index():
    return render_template('index.html')



@views.route('/about')
def about():
    return render_template('about.html')


@views.route('/information')
def information():
    return render_template('information.html')


@views.route('/travelLog')
def travelLog():
    return render_template('travelLog.html')

@views.route('/ub')
def ub():
    return render_template('ub.html')

@views.route('/tp')
def tp():
    comments=Comment.query.filter_by(post_id = 1)
    return render_template('techpark.html',comments=comments,user=current_user)

@views.route('/biotech')
def biotech():
    return render_template('biotech.html')

@views.route('/hm')
def hm():
    return render_template('hotelmgt.html')

@views.route("/create-comment/<post_id>", methods=['POST'])
@login_required
def create_comment(post_id):
    text = request.form.get('text')

    if not text:
        flash('Comment cannot be empty.', category='error')
    else:
        comment = Comment(text=text, author=current_user.id, post_id=1)
        db_sql.session.add(comment)
        db_sql.session.commit()
        print(comment.text)

    return redirect(url_for('views.tp'))