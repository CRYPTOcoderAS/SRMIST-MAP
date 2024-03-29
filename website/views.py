from flask import Blueprint, render_template
from flask_login import login_required, current_user
from flask import Flask, render_template, url_for, request, session, redirect
import pymongo
from .models import Comment,User
from . import db as db_sql
import pymysql as mysql 
from flask import Flask, render_template

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

@views.route('/tp12')
def tp12():
    return render_template('tp12.html')

@views.route('/tp13')
def tp13():
    return render_template('tp13.html')

@views.route('/tp1301')
def tp1301():
    return render_template('1301.html')

@views.route('/tp1303')
def tp1303():
    return render_template('1303.html')

@views.route('/tp1304')
def tp1304():
    return render_template('1304.html')

@views.route('/tp1306')
def tp1306():
    return render_template('1306.html')



@views.route('/about',methods=['POST','GET'])
def about():
    try:
        mydb = mysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',
            password='root',
            db='srm'
        )
        print("Connected successfully to mysql!!!")
    except:
        print("Could not connect to mysql")
    
    if "form2-submit" in request.form and request.method == 'POST':
        name = request.form['name']
        cursor = mydb.cursor()
        query = "Select p_name from tpinfo;"
        cursor.execute(query)
        professor_name = cursor.fetchall()
        print(professor_name)
        query2 = "select * from tpinfo where p_name= %s;"
        cursor.execute(query2,(name))
        data = cursor.fetchone()
        print(data)
        return render_template('about.html',data=data,professors=professor_name)
    cursor = mydb.cursor()
    query = "Select p_name from tpinfo;"
    cursor.execute(query)
    professor_name = cursor.fetchall()
    return render_template('about.html',professors=professor_name,data=('.','.','.','.'))

# @views.route('/about')
# def about():
#     return render_template('about.html')


@views.route('/information')
def information():
    return render_template('information.html')


@views.route('/travelLog')
def travelLog():
    return render_template('travelLog.html')

@views.route('/ub')
def ub():
    comments = Comment.query.filter_by(post_id=2)
    return render_template('ub.html',comments=comments,user=current_user)

@views.route('/tp')
def tp():
    comments=Comment.query.filter_by(post_id = 1)
    return render_template('techpark.html',comments=comments,user=current_user)

@views.route('/biotech')
def biotech():
    comments=Comment.query.filter_by(post_id = 3)
    return render_template('biotech.html',comments=comments,user=current_user)

@views.route('/hm')
def hm():
    comments = Comment.query.filter_by(post_id=4)
    return render_template('hotelmgt.html',comments=comments,user=current_user)

@views.route("/create-comment/<post_id>", methods=['POST'])
@login_required
def create_comment(post_id):
    text = request.form.get('text')

    if not text:
        flash('Comment cannot be empty.', category='error')
    else:
        comment = Comment(text=text, author=current_user.id, post_id=post_id)
        db_sql.session.add(comment)
        db_sql.session.commit()
        print(comment.text)
    print(post_id)
    if post_id=='2':
        return redirect(url_for('views.ub'))
    return redirect(url_for('views.tp'))
