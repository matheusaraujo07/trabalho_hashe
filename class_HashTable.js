class HashTable {
  constructor() {
    this.table = new Array(16); // tamanho inicial da tabela
    this.size = 0;
  }

  put(key, value) {
    const index = this.hash(key);
    const newNode = new Node(key, value);
    if (!this.table[index]) {
      this.table[index] = newNode;
    } else {
      let currentNode = this.table[index];
      while (currentNode.next) {
        if (currentNode.key === key) {
          currentNode.value = value;
          return;
        }
        currentNode = currentNode.next;
      }
      if (currentNode.key === key) {
        currentNode.value = value;
      } else {
        currentNode.next = newNode;
      }
    }
    this.size++;
  }

  get(key) {
    const index = this.hash(key);
    let currentNode = this.table[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  remove(key) {
    const index = this.hash(key);
    let currentNode = this.table[index];
    let prevNode = null;
    while (currentNode) {
      if (currentNode.key === key) {
        if (!prevNode) {
          this.table[index] = currentNode.next;
        } else {
          prevNode.next = currentNode.next;
        }
        this.size--;
        return currentNode.value;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += key.charCodeAt(i);
    }
    return hashCode % this.table.length;
  }

  print() {
    for (let i = 0; i < this.table.length; i++) {
      let currentNode = this.table[i];
      while (currentNode) {
        console.log(`[${i}] -> ${currentNode.key}: ${currentNode.value}`);
        currentNode = currentNode.next;
      }
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

// Teste do algoritmo
const hashTable = new HashTable();
hashTable.put("key1", "value1");
hashTable.put("key2", "value2");
hashTable.put("key3", "value3");
hashTable.put("key4", "value4");
hashTable.put("key5", "value5");
hashTable.put("key6", "value6");
hashTable.put("key7", "value7");
hashTable.put("key8", "value8");
hashTable.put("key9", "value9");
hashTable.put("key10", "value10");
hashTable.put("key11", "value11");
hashTable.put("key12", "value12");
hashTable.put("key13", "value13");
hashTable.put("key14", "value14");
hashTable.put("key15", "value15");
hashTable.put("key16", "value16");
hashTable.remove("key3");
hashTable.remove("key6");
hashTable.remove("key9");
hashTable.print();
