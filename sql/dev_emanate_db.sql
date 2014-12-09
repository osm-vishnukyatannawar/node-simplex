CREATE KEYSPACE emanate WITH REPLICATION = { 'class' : 'org.apache.cassandra.locator.SimpleStrategy', 'replication_factor': '1' } AND DURABLE_WRITES = true;

CREATE TABLE emanate.tag_data_dump_temp (
    organization_id text,
    dump_rec_id text,
    count_trials int,
    created_on timestamp,
    failure_reason text,
    has_failed boolean,
    is_processed boolean,
    read_flag boolean,
    tag_data text,
    tag_data_type int,
    tag_id text,
    PRIMARY KEY (organization_id, dump_rec_id)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;
CREATE INDEX tag_data_dump_temp_created_on_idx ON emanate.tag_data_dump_temp (created_on);
CREATE INDEX tag_data_dump_temp_read_flag_idx ON emanate.tag_data_dump_temp (read_flag);
CREATE INDEX tag_data_dump_temp_tag_data_type_idx ON emanate.tag_data_dump_temp (tag_data_type);
CREATE INDEX tag_data_dump_temp_tag_id_idx ON emanate.tag_data_dump_temp (tag_id);

CREATE TABLE emanate.users (
    firstname text,
    lastname text,
    PRIMARY KEY (firstname)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.tag_data_dump (
    organization_id text,
    dump_rec_id text,
    count_trials int,
    created_on timestamp,
    failure_reason text,
    has_failed boolean,
    is_processed boolean,
    tag_data text,
    tag_data_type int,
    tag_id text,
    PRIMARY KEY (organization_id, dump_rec_id)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;
CREATE INDEX tag_data_dump_is_processed_idx ON emanate.tag_data_dump (is_processed);
CREATE INDEX tag_data_dump_tag_data_type_idx ON emanate.tag_data_dump (tag_data_type);

CREATE TABLE emanate.datetime_check (
    slno int,
    datetime_bigint_col bigint,
    datetime_col timestamp,
    PRIMARY KEY (slno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.nodejs_tags_pk_timestamp (
    timestamp_col timestamp,
    slno int,
    description text,
    organization_id text,
    tag_id text,
    writetime_bigint bigint,
    writetime_timestamp timestamp,
    PRIMARY KEY (timestamp_col, slno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.nodejs_tags (
    id int,
    description text,
    tag_id text,
    writetime_int bigint,
    writetime_timestamp timestamp,
    PRIMARY KEY (id)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.nodejs_tags_pk_bigint (
    bigint_col bigint,
    slno int,
    description text,
    tag_id text,
    writetime_bigint bigint,
    writetime_timestamp timestamp,
    PRIMARY KEY (bigint_col, slno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.tag_data_temp (
    organization_id text,
    tag_srno text,
    created_on timestamp,
    tag_data text,
    PRIMARY KEY (organization_id, tag_srno, created_on)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.rawdata (
    slno bigint,
    insert_end timestamp,
    insert_start timestamp,
    list_col list<text>,
    map_col map<timestamp, text>,
    org_id text,
    rawdata_customtext text,
    set_col set<text>,
    tag_id text,
    PRIMARY KEY (slno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.tag_data_temp1 (
    organization_id text,
    created_on timestamp,
    tag_srno text,
    tag_data text,
    PRIMARY KEY (organization_id, created_on, tag_srno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.check_timetaken (
    slno int,
    description text,
    record_num int,
    table_name text,
    writetime_timestamp timestamp,
    PRIMARY KEY (slno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;

CREATE TABLE emanate.nodejs_tags_pk_date (
    date_col int,
    slno int,
    description text,
    organization_id text,
    tag_id text,
    writetime_bigint bigint,
    writetime_timestamp timestamp,
    PRIMARY KEY (date_col, slno)
) WITH read_repair_chance = 0.0
   AND dclocal_read_repair_chance = 0.1
   AND replicate_on_write = true
   AND gc_grace_seconds = 864000
   AND bloom_filter_fp_chance = 0.01
   AND caching = 'KEYS_ONLY'
   AND comment = ''
   AND compaction = { 'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
   AND compression = { 'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor' }
   AND default_time_to_live = 0
   AND speculative_retry = '99.0PERCENTILE'
   AND index_interval = 128;
