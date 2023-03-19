from flask import Blueprint, render_template, redirect, url_for, request, flash
from . import db
import pymongo
from pymongo import MongoClient
import osmnx as ox
import networkx as nx
import folium
import base64
from folium import IFrame
ox.config(log_console=True, use_cache=True)
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

dist = Blueprint("dist", __name__)



@dist.route('/distance',methods=['POST','GET'])
def distance():
    if request.method == 'POST':
        landmarks = db['LANDMARKS']
        source=request.form['source']
        target = request.form['target']
        mode= request.form['mode']
        optim = request.form['optim']
        source_coordinates=[]
        target_coordinates=[]

        for i in landmarks.find({str(source): {'$exists': 1}}):
            source_coordinates=i[str(source)]
            print(source_coordinates)
        for i in landmarks.find({str(target): {'$exists': 1}}):
            target_coordinates=i[str(target)]
        start_latlng = (source_coordinates[0],source_coordinates[1])
        end_latlng = (target_coordinates[0],target_coordinates[1])
        mode = 'walk'
        optimizer = optim
        graph = ox.graph.graph_from_bbox(12.8303, 12.8169, 80.0563, 80.0363,network_type=mode)
        # find the nearest node to the start location
        orig_node = ox.distance.nearest_nodes(graph, start_latlng[1], start_latlng[0])
        # find the nearest node to the end location
        dest_node = ox.distance.nearest_nodes(graph, end_latlng[1], end_latlng[0])
        #  find the shortest path
        shortest_route = nx.shortest_path(graph,
                                          orig_node,
                                          dest_node,
                                          weight=optimizer)
        le=nx.shortest_path_length(graph,orig_node,dest_node, method='dijkstra',weight=optimizer)
        if optimizer=='time':
            Info='It will take you '+str(le)+' minutes'
        elif optimizer=='length':
            Info='The distance between your source and target '+str(le)+' meters'
        else:
            Info='Please select your source and target'

        shortest_route_map = ox.plot_route_folium(graph, shortest_route, tiles='openstreetmap',tooptip='This tooltip will appear')
        # Add Marker
        if source == 'Tech Park':
            encoded = base64.b64encode(open('website/techpark.jpg', 'rb').read())
            html = '<img src="data:image/png;base64,{}">'.format
            iframe = IFrame(html(encoded.decode('UTF-8')), width=400, height=350)
            popup = folium.Popup(iframe, max_width=400)
            start_latlng = (start_latlng[0], start_latlng[1])
            start_marker = folium.Marker(location=start_latlng, icon=folium.Icon(color='green'), popup=popup,
                                         tooltip=source)
        elif source == 'BIO-Tech Block':
            encoded = base64.b64encode(open('website/BioTech.jpg', 'rb').read())
            html = '<img src="data:image/png;base64,{}">'.format
            iframe = IFrame(html(encoded.decode('UTF-8')), width=400, height=350)
            popup = folium.Popup(iframe, max_width=400)
            start_latlng = (start_latlng[0], start_latlng[1])
            start_marker = folium.Marker(location=start_latlng, icon=folium.Icon(color='green'), popup=popup,
                                         tooltip=html)
        elif source == 'SRM University Building':
            encoded = base64.b64encode(open('website/ub.jpg', 'rb').read())
            html = '<img src="data:image/png;base64,{}">'.format
            iframe = IFrame(html(encoded.decode('UTF-8')), width=400, height=350)
            popup = folium.Popup(iframe, max_width=400)
            start_latlng = (start_latlng[0], start_latlng[1])
            start_marker = folium.Marker(location=start_latlng, icon=folium.Icon(color='green'), popup=popup,
                                         tooltip=html)
        else:
            start_latlng = (start_latlng[0], start_latlng[1])
            start_marker = folium.Marker(location=start_latlng, icon=folium.Icon(color='green'), popup=source,
                                         tooltip=source)
        if target == 'Tech Park':
            encoded_t = base64.b64encode(open('website/techpark.jpg', 'rb').read())
            html_t = '<img src="data:image/png;base64,{}">'.format
            iframe_t = IFrame(html_t(encoded_t.decode('UTF-8')), width=400, height=350)
            popup_t = folium.Popup(iframe_t, max_width=400)
            end_latlng = (end_latlng[0], end_latlng[1])
            end_marker = folium.Marker(location=end_latlng, icon=folium.Icon(color='red'), popup=popup_t,tooltip=html_t)
        elif target == 'BIO-Tech Block':
            encoded_t = base64.b64encode(open('website/BioTech.jpg', 'rb').read())
            html_t = '<img src="data:image/png;base64,{}">'.format
            iframe_t = IFrame(html_t(encoded_t.decode('UTF-8')), width=400, height=350)
            popup_t = folium.Popup(iframe_t, max_width=400)
            end_latlng = (end_latlng[0], end_latlng[1])
            end_marker = folium.Marker(location=end_latlng, icon=folium.Icon(color='red'), popup=popup_t,
                                       tooltip=html_t)
        elif target == 'SRM University Building':
            encoded_t = base64.b64encode(open('website/ub.jpg', 'rb').read())
            html_t = '<img src="data:image/png;base64,{}">'.format
            iframe_t = IFrame(html_t(encoded_t.decode('UTF-8')), width=400, height=350)
            popup_t = folium.Popup(iframe_t, max_width=400)
            end_latlng = (end_latlng[0], end_latlng[1])
            end_marker = folium.Marker(location=end_latlng, icon=folium.Icon(color='red'), popup=popup_t,
                                       tooltip=html_t)
        else:
            end_latlng = (end_latlng[0], end_latlng[1])
            end_marker = folium.Marker(location=end_latlng, icon=folium.Icon(color='red'), popup=target,
                                       tooltip=target)
        # add the circle marker to the map
        start_marker.add_to(shortest_route_map)
        end_marker.add_to(shortest_route_map)
        shortest_route_map.save('website/static/Destination_map.html')
        return render_template('distance.html', landmarks=landmark,final_map='static/Destination_map.html',modes=['walk','bike','drive'],optims=['length','time'],Info=Info)
    return render_template('distance.html',landmarks=landmark,final_map='static/Destination_map.html',modes=['walk','bike','drive'],optims=['length','time'],Info='Please select your source and target')