import requests
import zmq

def get_pub_ip():
    response = requests.get('https://api.ipify.org')
    if(response.status_code == 200):
        return response.text
    else:
        return None
    
def load_nodes_file():
    with open('nodes.txt', 'r') as f:
        nodes = f.readlines()
        nodes = [node.strip() for node in nodes]
        return nodes

def check_if_exists(node):
    try:
        response = requests.get(f'http://{node}:5000')
        if(response.status_code == 200):
            return True
        else:
            return False
    except:
        return False

def connect_to_nodes(node_addresses, port):
    context = zmq.Context()
    socket = context.socket(zmq.PUB)

    for address in node_addresses:
        socket.connect(f"tcp://{address}:{port}")
        print(f"Connected to {address}")

    sub_socket = context.socket(zmq.SUB)
    sub_socket.setsockopt_string(zmq.SUBSCRIBE, '')
    sub_socket.bind(f"tcp://*:{port+1}")
    print(f"Listening for messages on port {port+1}...")

    while True:
        message = input("Enter a message: ")
        socket.send_string(message)

        # Receive and print any messages from other nodes
        try:
            message = sub_socket.recv_string(flags=zmq.NOBLOCK)
            print(f"Received message: {message}")
        except zmq.Again:
            pass

    socket.close()
    sub_socket.close()

nodes = load_nodes_file()
connect_to_nodes(nodes, 5000)
