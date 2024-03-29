use self::state::AppState;
use argon2::PasswordHash;
use axum::{
    extract::{ws::WebSocketUpgrade, State},
    http::StatusCode,
    routing::{get, post},
    Router,
};
use sea_orm::DatabaseConnection;
use std::sync::Arc;
use tower_http::cors::CorsLayer;

mod entities;
mod extractors;
mod handlers;
mod helpers;
mod packet;
mod state;
mod strings;

pub fn app(database: DatabaseConnection) -> Router {
    let state = Arc::new(AppState::new(database));
    Router::new()
        .route("/live", get(handler).with_state(Arc::clone(&state)))
        .route(
            "/register",
            post(handlers::register).with_state(Arc::clone(&state)),
        )
        .route(
            "/login",
            post(handlers::login).with_state(Arc::clone(&state)),
        )
        .route(
            "/logout",
            post(handlers::logout).with_state(Arc::clone(&state)),
        )
        .route("/@me", get(handlers::me).with_state(Arc::clone(&state)))
        .route("/companion", post(handlers::companion).with_state(state))
        .fallback(handlers::fallback)
        // TODO: Use a proper CORS policy.
        .layer(CorsLayer::very_permissive())
}

async fn handler(
    ws: WebSocketUpgrade,
    State(state): State<Arc<AppState>>,
) -> axum::response::Response {
    ws.on_upgrade(|socket| handlers::callback(socket, state))
}
