class ExtensibleHashTable {
  constructor(bucketSize, maxBuckets, dataFilePath) {
    this.bucketSize = bucketSize; // tamanho do bucket em bytes
    this.maxBuckets = maxBuckets; // número máximo de buckets permitidos
    this.dataFilePath = dataFilePath; // caminho do arquivo de dados
    this.buckets = []; // lista de buckets
    this.currentBucketIndex = 0; // índice do bucket atual
    this.numElements = 0; // número de elementos armazenados na tabela
    this.load(); // carrega a tabela a partir do arquivo de dados
  }

  hash(key) {
    // função de hash para obter o índice do bucket correspondente
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.maxBuckets;
  }

  load() {
    // carrega a tabela a partir do arquivo de dados
    let dataFile = fs.readFileSync(this.dataFilePath);
    let offset = 0;
    for (let i = 0; i < this.maxBuckets; i++) {
      let bucketData = dataFile.slice(offset, offset + this.bucketSize);
      let bucket = JSON.parse(bucketData);
      this.buckets.push(bucket);
      offset += this.bucketSize;
    }
  }

  save() {
    // salva a tabela no arquivo de dados
    let dataFile = Buffer.alloc(this.bucketSize * this.maxBuckets);
    let offset = 0;
    for (let i = 0; i < this.maxBuckets; i++) {
      let bucketData = JSON.stringify(this.buckets[i]);
      dataFile.write(bucketData, offset, this.bucketSize);
      offset += this.bucketSize;
    }
    fs.writeFileSync(this.dataFilePath, dataFile);
  }

  insert(key, value) {
    let bucketIndex = this.hash(key);
    let bucket = this.buckets[bucketIndex];

    // verifica se o bucket atual está cheio
    if (bucket.length === this.bucketSize) {
      // cria um novo bucket e adiciona o elemento nele
      let newBucket = [value];
      this.buckets.push(newBucket);
      this.maxBuckets++;
      this.currentBucketIndex++;

      // atualiza o índice do bucket original
      this.buckets[bucketIndex] = this.currentBucketIndex;

      // salva a tabela no arquivo de dados
      this.save();
    } else {
      // adiciona o elemento no bucket atual
      bucket.push(value);
    }

    this.numElements++;
  }

  search(key) {
    let bucketIndex = this.hash(key);
    let bucket = this.buckets[bucketIndex];

    // verifica se o bucket está vazio
    if (bucket.length === 0) {
      return null;
    }

    // procura o elemento no bucket atual
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return null;
  }

  remove(key) {
    let bucketIndex = this.hash(key);
    let bucket = this.buckets[bucketIndex];

    // verifica se o bucket está vazio
    if (bucket.length === 0) {
      return false;
    }

    // remove o elemento do bucket atual
    for (let i = 0; i < bucket.length; i++) }
