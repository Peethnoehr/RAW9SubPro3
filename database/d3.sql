/* D3 */
CREATE OR REPLACE FUNCTION exactMatchQuery (string VARCHAR(255)) RETURNS TABLE ( postid INTEGER, body TEXT, title TEXT, score INTEGER ) AS $$ 
DECLARE 
	q TEXT := '';
	string_elem TEXT;
	i INTEGER := 1;
BEGIN
	q := 'SELECT postid, body, title, score FROM QA_Post LEFT JOIN QA_Question ON QA_Post.postid = QA_Question.questionid ,(';
	FOR string_elem IN SELECT regexp_split_to_table(string, ' ')
	LOOP 
		q := q || 'SELECT id FROM wi WHERE word = ''';
		q := q || string_elem;
		IF (SELECT count(*) FROM regexp_split_to_table(string, ' ')) <> i THEN
			q := q || ''' INTERSECT ';
		END IF;
		i := i+1;
	END LOOP;
	q := q || ''') t WHERE id = postid;';
	RAISE NOTICE '%', q;
	RETURN QUERY EXECUTE q;
END;
$$ LANGUAGE plpgsql;