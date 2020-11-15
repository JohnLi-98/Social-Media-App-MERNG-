import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    /*
    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
    if (data) {
        console.log(data);
        const { getPosts: posts } = data;
    }
    if (error) {
        console.log(error);
        return "error";
    }

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>

            <Grid.Row>
                {loading && <h1>Loading posts...</h1>}
                {data && (
                    <Transition.Group>
                        {posts && posts.map((post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: '30px' }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
    */

    
    const {
        loading, data: { getPosts: posts } = {}
    } = useQuery(FETCH_POSTS_QUERY);
    
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>

            <Grid.Row>
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: '30px' }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
    
}

export default Home;